const SET_BACK_URL = (state, payload) => {
  state.backUrl = payload;
};

const SET_DATA = (state, payload) => {
  const token = document.head.querySelector('meta[name="csrf-token"]');

  if (token) {
    payload.csrfToken = (<HTMLMetaElement>token).content;
  }

  Object.assign(state, { ...payload });
};

const SET_MENU = (state, payload) => {
  state.menu = payload;
};

const SET_DIALOG_MESSAGE = (state, payload) => {
  state.dialogMessage = payload;
};

const SET_TITLE = (state, payload) => {
  let title =  payload + ' - ' + state.website.title;

  if (!payload) {
    title = state.website.title;
  }

  if (typeof document != 'undefined') {
    document.title = title;
  }

  state.title = title;
}

export default {
  SET_BACK_URL,
  SET_DATA,
  SET_MENU,
  SET_DIALOG_MESSAGE,
  SET_TITLE,
};
