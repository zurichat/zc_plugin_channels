/* eslint-disable no-irregular-whitespace */
import axios from "axios"

const baseURL = "https://channels.zuri.chat/api/v1"
// const baseURL = "http://127.0.0.1:8000/api/v1";

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    "Content-type": "application/json"
    // "Access-Control-Allow-Origin": "*",
  }
}

const api = axios.create({ ...defaultConfig })

api.interceptors.request.use(
  config => {
    const token = "" // Whatever the token is
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)
class APIServices {
  // @desc End Point Example
  async getUsers(data) {
    return api.post("/some-endpoint", data)
  }

  async createMessage(orgId, channelId, data) {
    return api.post(`/channels/messages/${orgId}/${channelId}/`, data)
  }

  async sendMessage(orgId, channelId, data) {
    return api.post(`/${orgId}/channels/${channelId}/messages/`, data)
  }

  async getMessages(orgId, channelId) {
    return api.get(`/${orgId}/channels/${channelId}/messages/`)
  }

  async deleteMessage(orgId, msgId) {
    return api.delete(`/channels​/messages​/${orgId}​/${msgId}​/delete​`)
  }

  async retrieveMessage(orgId, msgId) {
    return api.get(`/channels​/messages​/${orgId}​/${msgId}​/retrieve​`)
  }

  async updateMessage(orgId, channelId, userId, msgId, data) {
    return api.put(`/${orgId}/messages/${msgId}/`, data, {
      params: { userId, channelId }
    })
  }

  async createRole(orgId, channelId, data) {
    return api.post(`/channels/roles/${orgId}/${channelId}`, data)
  }

  async getRoles(orgId, channelId) {
    return api.get(`/channels​/roles​/${orgId}​/${channelId}​/all​`)
  }

  async deleteRole(orgId, roleId) {
    return api.delete(`​/channels​/roles​/${orgId}​/${roleId}​/delete`)
  }

  async retriveRole(orgId, roleId) {
    return api.get(`/channels​/role​s/${orgId}​/${roleId}​/retrieve`)
  }

  async updateRole(orgId, roleId, data) {
    return api.put(`/channels​/roles​/${orgId}​/${roleId}​/update`, data)
  }

  async createThread(orgId, channelMessageId, data) {
    return api.post(`/channels/threads/${orgId}/${channelMessageId}`, data)
  }

  async getThreads(orgId, channelMessageId) {
    return api.get(`/channels/threads/${orgId}/${channelMessageId}/all`)
  }

  async deleteThread(orgId, channelMessageId) {
    return api.delete(`/channels/threads/${orgId}/${channelMessageId}/delete`)
  }

  async updateThread(orgId, channelMessageId, data) {
    return api.put(
      `/channels/threads/${orgId}/${channelMessageId}/update`,
      data
    )
  }

  async createChannel(orgId, userId, data) {
    // old
    // return api.post(`/${orgId}/channels/`, data);
    // let addr =`${orgId}/channels/`
    //  let last = addr.lastIndexOf("/")
    // new
    const addr = `/org/${orgId}/users/${userId}/rooms/`
    const last = addr.lastIndexOf("/")
    // console.log("kk 0000",data)
    return api.post(addr.substr(0, last + 1), data)
  }

  async getChannels(orgId) {
    return api.get(`/${orgId}/channels/`)
  }

  async deleteChannel(orgId, channelId) {
    return api.delete(`​/channels​/${orgId}​/${channelId}​/delete​`)
  }

  async retrieveChannel(orgId, channelId) {
    return api.get(`/channels/${orgId}/${channelId}/retrieve`)
  }

  async updateChannel(orgId, channelId, data) {
    return api.put(`/${orgId}/channels/${channelId}/`, data)
  }

  async getPinnedMessages(orgId, channelId) {
    return api.get(`/${orgId}/channels/${channelId}/messages/?pinned=True`)
  }

  async getChannelDetails(orgId, channelId) {
    return api.get(`/${orgId}/channels/${channelId}/?format=json`)
  }

  async getSockets(orgId, channelId) {
    return api.get(`/${orgId}/channels/${channelId}/socket/`)
  }

  async addChannelMember(orgId, channelId, data) {
    // old
    return api.post(`/${orgId}/channels/${channelId}/members/`, data)

    // new
    // return api.post(`/org/${orgId}/room/${channelId}/members/${data._id}/`, data);
  }

  async removeChannelMember(orgId, channelId, data) {
    // old
    return api.delete(`/${orgId}/channels/${channelId}/members/`, data)
    // new
    // return api.patch(`/org/${orgId}/room/${channelId}/members/${data._id}/`, data);
  }

  async getChannelFiles(orgId, channelId) {
    return api.get(`/${orgId}/channels/${channelId}/media/?format=json`)
  }

  async userCanInput(orgId, channelId, data) {
    return api.post(`/${orgId}/channels/${channelId}/members/can-input`, data)
  }

  async setNotification(orgId, channelId, memberId, data) {
    return api.put(
      `/${orgId}/channels/${channelId}/members/${memberId}/notifications/`,
      data
    )
  }

  async getNotification(orgId, channelId, memberId) {
    return api.put(
      `/${orgId}/channels/${channelId}/members/${memberId}/notifications/`
    )
  }
}

const instance = new APIServices()

export default instance
