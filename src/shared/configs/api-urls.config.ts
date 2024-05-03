import { environment } from '../../environment/environment';

const { apiUrl } = environment;

class ApiUrls {
  announcements = `${apiUrl}/announcements`;
}

export default new ApiUrls();
