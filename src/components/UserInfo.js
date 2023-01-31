export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, userAvatarSelector }) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo(userdata) {
    return userdata;
  }

  renderInfoProfile(userdata) {
    this._usernameElement.textContent = userdata.name;
    this._userAboutElement.textContent = userdata.about;
    this._userAvatarElement.src = userdata.avatar;
    this._userAvatarElement.alt = `фотография ${userdata.name}`;
  }

  setUserInfo(userdata, apiUserDataPoster) {
    return apiUserDataPoster(userdata)
      .then((userdata) => {
        this._usernameElement.textContent = userdata.name;
        this._userAboutElement.textContent = userdata.about;
      })
  }

  setUserAvatar(userdata, apiUserAvatarPoster) {
    return apiUserAvatarPoster(userdata)
      .then((userdata) => {
        this._userAvatarElement.src = userdata.avatar;
        this._userAvatarElement.alt = `фотография ${userdata.name}`;
      })
  }
}
