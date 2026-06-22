import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../../redux/contactsSlice";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Занадто коротке ім'я!")
    .required("Поле з Іменем пусте!"),
  phone: Yup.string()
    .matches(/^\+?\d{10,12}$/, "Невірний формат номера телефону!")
    .required("Поле з телефоном пусте!"),
});

export default function UserForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: crypto.randomUUID(),
        name: values.username,
        number: values.phone,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ username: "", phone: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 320, my: 3 }}>
            <Field
              as={TextField}
              name="username"
              label="Name"
              variant="outlined"
              size="small"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            
            <Field
              as={TextField}
              name="phone"
              label="Phone Number"
              variant="outlined"
              size="small"
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <Button type="submit" variant="contained" color="primary">
              Add contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}