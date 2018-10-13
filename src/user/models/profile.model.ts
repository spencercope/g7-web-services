/**
 * PUT /users/update-profile
 */
export class ProfileModel {
  organization?: string;
  nickname?: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}
