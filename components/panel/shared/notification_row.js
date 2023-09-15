export default function NotifRow(props){
    return(
        <>
            <a
                href="#"
                className="list-group-item list-group-item-action border-bottom"
                >
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-auto">
                        <div className="icon-shape icon-sm icon-shape-danger rounded me-3">
                            <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center flex-row-reverse">
                            <div>
                            <h4 className="h6 mb-0 text-small">آگهی جدید</h4>
                            </div>
                            <div className="text-end">
                            <small className="text-danger">چند دقیقه قبل</small>
                            </div>
                        </div>
                        <p className="font-small mt-1 mb-0 text-end rtl text-gray-600">
                            آگهی جدید در انتظار بررسی است.
                        </p>
                    </div>
                </div>
            </a>
        </>
    )
}