
export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, userAvatarSelector }) {
    this._usernameSelector = usernameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserInfo(userdata) {
    return userdata;
  }

  renderInfoProfile(userdata) {
    document.querySelector(this._usernameSelector).textContent = userdata.name;
    document.querySelector(this._userAboutSelector).textContent = userdata.about;
    document.querySelector(this._userAvatarSelector).src = userdata.avatar;
    document.querySelector(this._userAvatarSelector).alt = `фотография ${userdata.name}`;
  }

  setUserInfo(userdata, apiUserDataPoster) {
    return apiUserDataPoster(userdata)
      .then((userdata) => {
        document.querySelector(this._usernameSelector).textContent = userdata.name;
        document.querySelector(this._userAboutSelector).textContent = userdata.about;
      })
  }

  setUserAvatar(userdata, apiUserAvatarPoster) {
    return apiUserAvatarPoster(userdata)
      .then((userdata) => {
        document.querySelector(this._userAvatarSelector).src = userdata.avatar;
        document.querySelector(this._userAvatarSelector).alt = `фотография ${userdata.name}`;
      })
  }
}
