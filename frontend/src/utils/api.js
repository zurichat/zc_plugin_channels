import axios from "axios";

const baseURL = "channels.zuri.chat/api";

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
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
    return api.post(`/channels/messages/${org_id}/${channel_id}`, data);
  }

  async getMessages(org_id, channel_id) {
    return api.get(`​/channels​/message​s/${org_id}​/${channel_id}​/all​`);
  }

  async deleteMessage(org_id, msg_id) {
    return api.delete(
      `/channels​/messages​/${org_id}​/${msg_id}​/delete​`
    );
  }

  async retrieveMessage(org_id, msg_id) {
    return api.get(
      `/channels​/messages​/${org_id}​/${msg_id}​/retrieve​`
    );
  }

  async updateMessage(org_id, msg_id, data) {
    return api.put(
      `/channels​/messages​/${org_id}​/${msg_id}​/update`,
      data
    );
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
    return api.delete(`/channels/threads/${org_id}/${channelmessage_id}/delete`);
  }

  async updateThread(org_id, channelmessage_id, data) {
    return api.put(
      `/channels/threads/${org_id}/${channelmessage_id}/update`,
      data
    );
  }

  async createChannel(org_id, data) {
    return api.post(`/channels​/${org_id}​`, data);
  }

  async getChannels(org_id) {
    return api.get(`/channels/${org_id}/all`);
  }

  async deleteChannel(org_id, channel_id) {
    return api.delete(`​/channels​/${org_id}​/${channel_id}​/delete​`);
  }

  async retrieveChannel(org_id, channel_id) {
    return api.get(`/channels/${org_id}/${channel_id}/retrieve`);
  }

  async updateChannel(org_id, channel_id, data) {
    return api.put(`/channels/${org_id}/${channel_id}/update`, data);
  }
}

const instance = new APIServices();

export default instance;
