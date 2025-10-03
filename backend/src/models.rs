use diesel::prelude::*;
use serde::{ Serialize , Deserialize };
use crate::schema::rrnotes;

#[derive(Serialize, Deserialize, Queryable , Selectable)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = rrnotes)]
pub struct RrNote {
    pub found_id : String,
    pub access_password : String,
}

#[derive(Insertable , Selectable , Queryable)]
#[diesel(table_name = rrnotes)]
pub struct RrNoteFullObject {
    pub found_id : String,
    pub note_text : String,
    pub creator_name : String,
    pub creator_password : String,
    pub access_password : String,
}

#[derive(Serialize, Deserialize)]
pub struct NewRRNote {
    pub creator_name : String,
    pub creator_password : String,
    pub note_text : String,
    pub access_password : String,
}

#[derive(Serialize, Deserialize , Queryable , Selectable)]
#[diesel(table_name = rrnotes)]
pub struct DeleteRRNote {
    pub found_id : String,
    pub creator_password: String,
}