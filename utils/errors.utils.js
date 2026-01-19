export const signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" }

    if(err.message.includes("pseudo")){
        errors.pseudo = "Pseudo incorrect ou vide"
    }

    if(err.message.includes("email")){
        errors.email = "Email incorrect ou vide"
    }

    if(err.message.includes("password")){
        errors.password = "Le mot de passe doit faire 6 caracteres minimum"
    }

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("pseudo")){
        errors.pseudo = "Ce pseudo est deja pris"
    }

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")){
        errors.pseudo = "Ce email est deja enregistrer"
    }

    return errors
}

//signin errors
export const signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "email incorrect") {
    errors.email = "Email incorrect";
  }

  if (err.message === "password incorrect") {
    errors.password = "Mot de passe incorrect";
  }

  if (err.message === "missing fields") {
    errors.email = "Email requis";
    errors.password = "Mot de passe requis";
  }

  return errors;
};

//upload errors
export const uploadErrors = (err) => {
  let errors = {format: "", maxSize: ""}

  if (err.message.includes('invalid file')) {
    errors.format = 'Format non prise'
  }

  if (err.message.includes('max size')) {
    errors.maxSize = 'le fichier depasse 500Ko'
  }

  return errors
}
