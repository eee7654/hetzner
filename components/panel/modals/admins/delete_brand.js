import { Modal } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

export default function DeleteBrand(props) {
  let [show, setShow] = props.state;
  let onHide = (e) => {
    setShow(false);
  }
  const arrayRemove = (arr, value)=>{
    return arr.filter(function (ele) {
      return ele.brand_id != value;
    });
  }
  let onClick = (e) => {
    setShow(false);
    props.setReqLoad(true);
    axios
    .post("/api/admins/brands/delete", {brand_id:props.brandId},{headers:{'csrf-token':props.csrfToken}})
    .then((response) => {
      let resObj = response.data;
      if (resObj.status == "ok") {
        props.setBrands((brands)=>{
          return arrayRemove(brands,props.brandId)
        })
        props.setReqLoad(false);
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
    })
  };
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Header>
        <button
          type="button"
          className="btn-close me-auto ms-0"
          aria-label="Close"
          onClick={onHide}
        />
        <Modal.Title id="contained-modal-title-vcenter">حذف برند</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 p-lg-4">
        <p className="text-end mb-0">از حذف برند مطمئن هستید؟</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <div className="d-flex flex-row float-end">
          <button className="btn btn-danger me-2" onClick={onClick}>
            حذف
          </button>
          <button
            onClick={onHide}
            className="btn btn-gray-500"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            انصراف
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
