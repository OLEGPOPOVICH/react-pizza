import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from 'yup';
import { File } from "../../../component/File/File";
import { checkFileExsist, checkFileTypes, checkMaxFileSize } from "../../../utils";
import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "./constants";
import "./styles.css";

const IngredientCreationScheme = Yup.object().shape({
  price: Yup.number()
    .required('Обязательное поле'),
  category: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  slug: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  thumbnail: Yup.mixed()
    .required('Обязательное поле')
    .test(
      "fileSize",
      `Файл слишком большой. Мак. размер: ${MAX_FILE_SIZE} Байт`,
      (value) => !checkFileExsist(value) || checkMaxFileSize(value[0].size, MAX_FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Неподдерживаемый формат",
      (value) => !checkFileExsist(value) || checkFileTypes(value[0].type, SUPPORTED_FORMATS)
    ),
  image: Yup.mixed()
    .required('Обязательное поле')
    .test(
      "fileSize",
      `Файл слишком большой. Мак. размер: ${MAX_FILE_SIZE} Байт`,
      (value) => !checkFileExsist(value) || checkMaxFileSize(value[0].size, MAX_FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Неподдерживаемый формат",
      (value) => !checkFileExsist(value) || checkFileTypes(value[0].type, SUPPORTED_FORMATS)
    )
});

const validateValue = (value) => {
  let errorMsg = null;

  if (!value) {
    errorMsg =  'Обязательное поле';
  }

  if (value && value.length < 3) {
    errorMsg = `Минимальное кол-во символов 3, сейчас ${value.length}`
  }

  return errorMsg;
}

const initialValues = {
  value: '',
  price: '',
  category: '',
  slug: '',
  checked: false,
  thumbnail: '',
  image: ''
};

export const IngredientCreationForm = ({
  onSubmit
}) => {
  const formRef = useRef();
  const thumbnailRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (["image", "thumbnail"].includes(key)) {
        if (values[key][0]) {
          formData.append(key, values[key][0]);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    onSubmit(formData, {
      form: formRef,
      thumbnail: thumbnailRef,
      image: imageRef
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={IngredientCreationScheme}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        setFieldValue
      }) => (
        <Form ref={formRef} className="creation__form">
          <table className="table">
            <tbody>
              <tr>
                <td>Название:</td>
                <td>
                  <Field
                    name="value"
                    validate={validateValue}
                  />
                  <ErrorMessage  name="value" render={msg => <div className="txt-error">{msg}</div>} />
                </td>
              </tr>
              <tr>
                <td>Цена:</td>
                <td>
                  <Field name="price" />
                  <ErrorMessage name="price" render={msg => <div className="txt-error">{msg}</div>} />
                </td>
              </tr>
              <tr>
                <td>Категория:</td>
                <td>
                  <Field name="category" />
                  <ErrorMessage name="category" render={msg => <div className="txt-error">{msg}</div>} />
                </td>
              </tr>
              <tr>
                <td>Слаг:</td>
                <td>
                  <Field name="slug" />
                  <ErrorMessage name="slug" render={msg => <div className="txt-error">{msg}</div>} />
                </td>
              </tr>
              <tr>
                <td>По умолнчанию:</td>
                <td>
                  <Field type="checkbox" name="checked" />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <File>
                    <File.Label label="Главная фотка" />
                    <File.ButtonUpload
                      name="thumbnail"
                      ref={thumbnailRef}
                      onChange={(event) => {
                        setFieldValue("thumbnail", event.currentTarget.files);
                      }}
                    />
                    {
                      checkFileExsist(values.thumbnail)
                      && (
                        <>
                          <File.Thumb file={values.thumbnail[0]} width="300" />
                          <File.Size size={values.thumbnail[0].size} />
                        </>
                      )
                    }
                    <File.FileError className="txt-error" error={errors.thumbnail} />
                  </File>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <File>
                    <File.Label label="Доп. фотка" />
                    <File.ButtonUpload
                      name="image"
                      ref={imageRef}
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files);
                      }}
                    />
                    {
                      checkFileExsist(values.image)
                      && (
                        <>
                          <File.Thumb file={values.image[0]} width="300" />
                          <File.Size size={values.image[0].size} />
                        </>
                      )
                    }
                    <File.FileError className="txt-error" error={errors.image} />
                  </File>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Создать</button>
        </Form>
      )}
    </Formik>
  );
};
