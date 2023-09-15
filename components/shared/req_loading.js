import { Modal } from "react-bootstrap"
import {ThreeDots} from 'react-loader-spinner'
import styles from '../../styles/shared/req_loading.module.css'

const ReqLoading = (props)=>{
    return(
        <Modal show={props.isLoad} centered backdrop='static' size="sm">
            <Modal.Body className="p-0">
                <div className={`p-3 p-lg-4 text-center d-flex flex-column justify-content-center align-items-center`}>
                    <h4>در حال پردازش اطلاعات</h4>
                    <ThreeDots
                        height="80" 
                        width="80" 
                        radius="9"
                        color="rgb(0,168,95)" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName="mt-1"
                        visible={true}
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ReqLoading