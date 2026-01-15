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

  return errors;
};
