import { Form, Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function ExcelMotor(props) {
  let [show, setShow] = props.state;
  const [validated, setValidated] = useState(false);
  let onHide = (e) => {
    setShow(false);
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true)
    } else {
      let formData = new FormData(form)
      props.setReqLoad(true);
      axios.post("/api/admins/motors/create/from-excel",formData,{headers:{'content-type': 'multipart/form-data','csrf-token':props.csrfToken}})
      .then((response) => {
          let resObj = response.data;
          if (resObj.status == "ok") {
              props.setReqLoad(false);
              props.refecth(1)
              setShow(false)
          }
      })
      .catch((reason) => {
      props.setReqLoad(false);
      switch (reason.response.data.status) {
          case "noAuth":
          const router = useRouter();
          router.push("/admins/login");
          break;
      }
      });
    }
  }
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Header>
        <button
          type="button"
          className="btn-close me-auto ms-0"
          aria-label="Close"
          onClick={onHide}
        />
        <Modal.Title id="contained-modal-title-vcenter">
          اضافه کردن از اکسل 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 py-2">
        <Form noValidate validated={validated} onSubmit={handleSubmit} dir="rtl">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>فایل اکسل</Form.Label>
              <Form.Control
                required
                name="motors"
                type="file"
              />
              <Form.Control.Feedback type="invalid">
                لطفاً فایل را انتخاب کنید.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4 mb-2 float-start">
              ارسال
            </Button>
          </Form>
      </Modal.Body>
    </Modal>
  );
}
