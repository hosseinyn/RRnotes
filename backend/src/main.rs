mod schema;
mod database;
mod models;
mod handlers;

#[macro_use] extern crate rocket;
use crate::handlers as routes;
use rocket_cors::{AllowedOrigins, CorsOptions};
use rocket::http::Method;

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions {
        allowed_origins: AllowedOrigins::some_exact(&["http://localhost:5173"]),
        allowed_methods: vec![Method::Post]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: rocket_cors::AllOrSome::All,
        allow_credentials: true,
        ..Default::default()
    }
        .to_cors()
        .expect("Error creating CORS");

    rocket::build()
        .attach(cors)
        .mount("/api", routes![
            routes::create_note,
            routes::remove_note,
            routes::see_note,
        ])
}
