import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      SiteTitle: "Events list",
      SiteSubtitle: "",
      All: "All",
      Upcoming: "Upcoming",
      Occurred: "Occurred",
      NotAuthorized: "You are not authorized",
      ToTheSignInPage: "Sign in",
      Email: "Email",
      Password: "Password",
      SignIn: "Sign in",
      SignOut: "Sign out",
      AuthErrorLoginPassword: "Authorization error: wrong email or password",
      // Admin panel
      AdminPanel: "administration panel",
      AddEvent: "Add event",
      BackToTheList: "Back to the list of events",
      EventTitle: "Title",
      Speaker: "Speaker",
      Date: "Date",
      Time: "Time",
      Place: "Place",
      DefaultPlace: "",
      Save: "Save",
      EventSuccessfullySaved: "Event successfully saved",
      SavingError: "Saving error",
      Edit: "Edit",
      EditEvent: "Edit event",
    },
  },
  ru: {
    translation: {
      SiteTitle: "Низкоразмерный семинар ФТИ",
      SiteSubtitle: "Расписание докладов",
      All: "Все",
      Upcoming: "Предстоящие",
      Occurred: "Прошедшие",
      NotAuthorized: "Вы не авторизованы",
      ToTheSignInPage: "На страницу авторизации",
      Email: "Электронная почта",
      Password: "Пароль",
      SignIn: "Войти",
      SignOut: "Выйти",
      AuthErrorLoginPassword: "Ошибка авторизации: неверный логин или пароль",
      // Admin panel
      AdminPanel: "панель администрирования",
      AddEvent: "Добавить семинар",
      BackToTheList: "Назад к списку семинаров",
      EventTitle: "Тема",
      Speaker: "Докладчик",
      Date: "Дата",
      Time: "Время",
      Place: "Место",
      DefaultPlace: "ФТИ им. А.Ф. Иоффе, кор.Б, комн.320",
      Save: "Сохранить",
      EventSuccessfullySaved: "Семинар успешно сохранен",
      SavingError: "Ошибка сохранения",
      Edit: "Редактировать",
      EditEvent: "Редактировать семинар",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
