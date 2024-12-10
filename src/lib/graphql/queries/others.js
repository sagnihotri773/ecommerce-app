import { gql } from "@apollo/client";

export const COUNTRIES = gql`
    query Countries {
        countries {
            full_name_english
            full_name_locale
            id
            three_letter_abbreviation
            two_letter_abbreviation
            available_regions {
                code
                id
                name
            }
        }
    }`;
