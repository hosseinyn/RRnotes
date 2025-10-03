// @generated automatically by Diesel CLI.

diesel::table! {
    rrnotes (found_id) {
        found_id -> Text,
        note_text -> Text,
        creator_name -> Text,
        creator_password -> Text,
        access_password -> Text,
    }
}
