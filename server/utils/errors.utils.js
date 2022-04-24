module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize =
      "Le fichier est trop volumineux, il ne doit pas dépasser 500 Ko";
  return errors;
};
