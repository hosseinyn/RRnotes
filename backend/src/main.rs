mod schema;
mod database;
mod models;
mod handlers;

#[macro_use] extern crate rocket;
use crate::handlers as routes;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![
            routes::create_note,
            routes::remove_note,
            routes::see_note,
        ])
}
