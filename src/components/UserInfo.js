export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, userAvatarSelector }) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      about: this._userAboutElement.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._usernameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._userAvatarElement.alt = `фотография ${name}`;
    this._id = _id;
  }
}
