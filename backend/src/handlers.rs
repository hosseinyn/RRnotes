use crate::database::establish_connection;
use crate::models::*;
use crate::schema::rrnotes;
use diesel::prelude::*;
use rocket::{post};
use rocket::serde::json::Json;
use rocket::serde::Serialize;
use rand::{distributions::Alphanumeric, Rng};
use bcrypt::{hash, verify, DEFAULT_COST};

// Json message model
#[derive(Serialize)]
pub struct Message {
    pub message: String,
}

fn generate_random_string(length: usize) -> String {
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect()
}

#[post("/create-note" , data = "<note>")]
pub fn create_note(note: Json<NewRRNote>) -> Json<Message> {

    let mut conn = establish_connection();

    let user_data = note.into_inner();

    let hashed_creator_password = hash(user_data.creator_password.clone(), DEFAULT_COST);
    let hashed_access_password = hash(user_data.access_password.clone(), DEFAULT_COST);
    let generated_founder_id = generate_random_string(6);

    let new_note = RrNoteFullObject {
        found_id: generated_founder_id.clone(),
        creator_name: user_data.creator_name.clone(),
        note_text: user_data.note_text.clone(),
        creator_password: hashed_creator_password.unwrap(),
        access_password: hashed_access_password.unwrap(),
    };

    let insert_note = diesel::insert_into(rrnotes::table)
        .values(new_note)
        .execute(&mut conn);

    if insert_note.is_ok() {
        Json(Message {
            message: format!("Note created successfully : {}" , generated_founder_id).to_string(),
        })
    } else {
        Json(Message {
            message: "error in creating note".to_string(),
        })
    }



}

#[post("/remove-note" , data = "<note>")]
pub fn remove_note(note: Json<DeleteRRNote>) -> Json<Message> {

    let mut conn = establish_connection();

    let user_data = note.into_inner();

    use crate::schema::rrnotes::dsl::*;

    let found_note : DeleteRRNote = rrnotes
        .filter(found_id.eq(user_data.found_id.clone()))
        .select(DeleteRRNote::as_select())
        .first(&mut conn)
        .expect("failed");

    if found_note.found_id == user_data.found_id.clone() {

        use diesel::dsl::delete;

        let is_valid = verify(user_data.creator_password.clone(), &found_note.creator_password);

        if is_valid.expect("not valid") {
            delete(rrnotes.filter(found_id.eq(user_data.found_id.clone()))).execute(&mut conn).expect("cannot delete");

            Json(Message {
                message: "Note removed successfully".to_string(),
            })

        } else {
            Json(Message {
                message: "Password is incorrect".to_string(),
            })
        }


    } else {
        Json(Message {
            message: "error in removing note".to_string(),
        })
    }



}


#[post("/see-note" , data = "<note>")]
pub fn see_note(note: Json<RrNote>) -> Json<Message> {

    let mut conn = establish_connection();

    let user_data = note.into_inner();

    use crate::schema::rrnotes::dsl::*;

    let found_note = rrnotes
        .filter(found_id.eq(user_data.found_id.clone()))
        .select(RrNoteFullObject::as_select())
        .first(&mut conn)
        .expect("failed");

    if found_note.found_id == user_data.found_id.clone() {


        let is_valid = verify(user_data.access_password.clone(), &found_note.access_password);

        if is_valid.expect("not valid") {

            Json(Message {
                message: found_note.note_text.to_string(),
            })

        } else {
            Json(Message {
                message: "Password is incorrect".to_string(),
            })
        }


    } else {
        Json(Message {
            message: "error in getting note".to_string(),
        })
    }



}
