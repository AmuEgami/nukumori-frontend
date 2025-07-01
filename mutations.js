/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
