
export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, userAvatarSelector }) {
    this._usernameSelector = usernameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserInfo(userdata) {
    return userdata;
  }

  setUserInfo(userdata, apiUserDataPoster) {
    // console.log(apiUserDataPoster);
    apiUserDataPoster(userdata)
      .then((data) => {
        document.querySelector(this._usernameSelector).textContent = userdata.name;
        document.querySelector(this._userAboutSelector).textContent = userdata.about;
        // console.log(data)
      })
  }

  setUserAvatar(userdata, apiUserAvatarPoster) {
    apiUserAvatarPoster(userdata);
    document.querySelector(this._userAvatarSelector).src = userdata.avatar;
    document.querySelector(this._userAvatarSelector).alt = `фотография ${userdata.name}`;
  }
}
