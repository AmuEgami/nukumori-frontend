/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onCreateUserProfile(filter: $filter, owner: $owner) {
      user_id
      user_name
      bio
      hobbies
      mbti
      favorite_foods
      disliked_foods
      location
      updated_at
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onUpdateUserProfile(filter: $filter, owner: $owner) {
      user_id
      user_name
      bio
      hobbies
      mbti
      favorite_foods
      disliked_foods
      location
      updated_at
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onDeleteUserProfile(filter: $filter, owner: $owner) {
      user_id
      user_name
      bio
      hobbies
      mbti
      favorite_foods
      disliked_foods
      location
      updated_at
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
