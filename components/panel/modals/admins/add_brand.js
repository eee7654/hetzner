import { Form, Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function AddBrand(props) {
  let [show, setShow] = props.state;
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    brand_name: "",
    slug: ""
  });
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
        props.setReqLoad(true);
        axios.post("/api/admins/brands/create",formData,{headers:{'csrf-token':props.csrfToken}})
        .then((response) => {
            let resObj = response.data;
            if (resObj.status == "ok") {
                props.setBrands((brands)=>{
                    return [...brands,response.data.bData]
                })
                props.setReqLoad(false);
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
          افزودن برند
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 py-2">
        <Form noValidate validated={validated} onSubmit={handleSubmit} dir="rtl">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>نام برند</Form.Label>
              <Form.Control
                required
                name="brand_name"
                defaultValue={formData.hostname}
                type="text"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    brand_name: event.target.value,
                  })
                }
                minLength={3}
                maxLength={30}
              />
              <Form.Control.Feedback type="invalid">
                لطفاً برند را وارد کنید.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>نامک</Form.Label>
              <Form.Control
                required
                name="slug"
                defaultValue={formData.slug}
                type="text"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    slug: event.target.value,
                  })
                }
                minLength={3}
                maxLength={30}
              />
              <Form.Control.Feedback type="invalid">
                لطفاً نامک را وارد کنید.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4 mb-2 float-start">
              ذخیره
            </Button>
          </Form>
      </Modal.Body>
    </Modal>
  );
}
