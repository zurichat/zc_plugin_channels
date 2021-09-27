import axios from "axios";

const baseURL = "https://channels.zuri.chat/api/v1";
// const baseURL = "http://127.0.0.1:8000/api/v1";

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create({ ...defaultConfig });

api.interceptors.request.use(
  (config) => {
    const token = ""; // Whatever the token is
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);
class APIServices {
  // @desc End Point Example
  async getUsers(data) {
    return api.post("/some-endpoint", data);
  }

  async createMessage(org_id, channel_id, data) {
    return api.post(`/channels/messages/${org_id}/${channel_id}/`, data);
  }
  async sendMessage(org_id, channel_id, data) {
    return api.post(`/${org_id}/channels/${channel_id}/messages/`, data);
  }

  async getMessages(org_id, channel_id) {
    return api.get(`/${org_id}/channels/${channel_id}/messages/`);
  }

  async deleteMessage(org_id, msg_id) {
    return api.delete(`/channels​/messages​/${org_id}​/${msg_id}​/delete​`);
  }

  async retrieveMessage(org_id, msg_id) {
    return api.get(`/channels​/messages​/${org_id}​/${msg_id}​/retrieve​`);
  }

  async updateMessage(org_id, channel_id, user_id, msg_id, data) {
    return api.put(`/${org_id}/messages/${msg_id}/`, data, {
      params: { user_id, channel_id },
    });
  }

  async createRole(org_id, channel_id, data) {
    return api.post(`/channels/roles/${org_id}/${channel_id}`, data);
  }

  async getRoles(org_id, channel_id) {
    return api.get(`/channels​/roles​/${org_id}​/${channel_id}​/all​`);
  }

  async deleteRole(org_id, role_id) {
    return api.delete(`​/channels​/roles​/${org_id}​/${role_id}​/delete`);
  }

  async retriveRole(org_id, role_id) {
    return api.get(`/channels​/role​s/${org_id}​/${role_id}​/retrieve`);
  }

  async updateRole(org_id, role_id, data) {
    return api.put(`/channels​/roles​/${org_id}​/${role_id}​/update`, data);
  }

  async createThread(org_id, channelmessage_id, data) {
    return api.post(`/channels/threads/${org_id}/${channelmessage_id}`, data);
  }

  async getThreads(org_id, channelmessage_id) {
    return api.get(`/channels/threads/${org_id}/${channelmessage_id}/all`);
  }

  async deleteThread(org_id, channelmessage_id) {
    return api.delete(
      `/channels/threads/${org_id}/${channelmessage_id}/delete`
    );
  }

  async updateThread(org_id, channelmessage_id, data) {
    return api.put(
      `/channels/threads/${org_id}/${channelmessage_id}/update`,
      data
    );
  }

  async createChannel(org_id, data) {
    // return api.post(`/v1​/${org_id}​/channels​/​`, data);
    return axios.post(`${baseURL}/${org_id}/channels/`, data);
  }

  async getChannels(org_id) {
    return api.get(`/${org_id}/channels/`);
  }

  async deleteChannel(org_id, channel_id) {
    return api.delete(`​/channels​/${org_id}​/${channel_id}​/delete​`);
  }

  async retrieveChannel(org_id, channel_id) {
    return api.get(`/channels/${org_id}/${channel_id}/retrieve`);
  }

  async updateChannel(org_id, channel_id, data) {
    return api.put(`/${org_id}/channels/${channel_id}/`, data);
  }

  async getPinnedMessages(org_id, channel_id) {
    return api.get(`/${org_id}/channels/${channel_id}/messages/?pinned=True`);
  }

  async getChannelDetails(org_id, channel_id) {
    return api.get(`/${org_id}/channels/${channel_id}/?format=json`);
  }

  async getSockets(org_id, channel_id) {
    return api.get(`/${org_id}/channels/${channel_id}/socket/`);
  }

  async addChannelMember(org_id, channel_id, data) {
    return api.post(`/${org_id}/channels/${channel_id}/members/`, data);
  }
}

const instance = new APIServices();

export default instance;
