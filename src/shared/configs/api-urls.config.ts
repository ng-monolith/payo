import { environment } from '../../environment/environment';

const { apiUrl } = environment;

class ApiUrls {
  newsletters = `${apiUrl}/newsletters`;
  posts = `${apiUrl}/posts`;
  users = `${apiUrl}/users`;
  announcements = `${apiUrl}/announcements`;
}

export default new ApiUrls();
