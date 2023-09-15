import Link from "next/link";
import { Button } from "react-bootstrap";


export const UserServersColumn = (props)=>{
    return [
        {
            prop: "name",
            title:"نام سرور",
            isFilterable: true,
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "dns",
            title:"آدرس سرور",
            isFilterable: true,
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "status",
            title: "وضعیت",
            isSortable: true,
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "button",
            title: "آدرس آی‌پی",
            isSortable: true,
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'},
            cell: (row) => (
                <span >{row.ipv4 != null ? row.ipv4.current_ip : '-'}</span >
            )
        },
        {
            prop: "id",
            title: "شناسه",
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "button",
            title:"عملیات",
            cell: (row) => (
                <>
                    <Button
                        className="btn-sm pt-2"
                        variant="outline-info"
                        onClick={(e)=>{
                            props.doChangeIP([row.id,row.ipv4 != null ? row.ipv4.current_id : 0])
                        }}
                    >
                        <i className="bi-arrow-clockwise"></i>
                    </Button>
                    {row.ipv4 != null && (
                        <Button
                            className="btn-sm pt-2 me-2"
                            variant="outline-warning"
                            onClick={(e)=>{
                                props.saveChangeIP([row.ipv4.current_ip,row.dns])
                            }}
                        >
                            <i className="bi-cloud-check-fill"></i>
                        </Button>
                    )}
                    {row.ipv4 != null && (
                        <Button
                            className="btn-sm pt-2 me-2"
                            variant="outline-secondary"
                            onClick={(e)=>{
                                //props.openEditBrand(row.id)
                            }}
                        >
                            {row.status == 'روشن' ? (<i className="bi-stop-fill"></i>) : (<i className="bi-play-fill"></i>)}
                            
                        </Button>
                    )}
                </>
            ),
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        }
    ]
}

export const AdminServersColumn = (props)=>{
    return [
        {
            prop: "hostname",
            title:"هاست نیم",
            isFilterable: true,
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "ip",
            title: "آی پی",
            isSortable: true,
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "hosting",
            title: "هاستینگ",
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "location",
            title: "کشور",
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        
        {
            prop: "button",
            title:"عملیات",
            cell: (row) => (
                <>
                    <Button
                        className="btn-sm delOpt pt-2"
                        variant="outline-danger"
                        onClick={(e)=>{
                            props.openDeleteSrv(row.srv_id)
                        }}
                    >
                        <i className="bi-trash-fill"></i>
                    </Button>
                </>
            ),
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        }
    ]
}

export const AdminBrandsColumn = (props)=>{
    return [
        {
            prop: "brand_name",
            title:"نام برند",
            isFilterable: true,
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "slug",
            title: "نامک",
            isSortable: true,
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "button",
            title:"عملیات",
            cell: (row) => (
                <>
                    <Button
                        className="btn-sm delOpt pt-2"
                        variant="outline-danger"
                        onClick={(e)=>{
                            props.openDeleteBrand(row.brand_id)
                        }}
                    >
                        <i className="bi-trash-fill"></i>
                    </Button>
                    <Button
                        className="btn-sm  pt-2 me-2"
                        variant="outline-warning"
                        onClick={(e)=>{
                            props.openEditBrand(row.brand_id)
                        }}
                    >
                        <i className="bi-pen"></i>
                    </Button>
                </>
            ),
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        }
    ]
}

export const AdminMentorsColumn = (props)=>{
    return [
        {
            prop: "full_name",
            title:"نام منتور",
            isFilterable: true,
            cell: (row) => (
                <Link legacyBehavior
                    href={`/admins/mentors/jkh-${row.id}`}
                >
                    <a>{row.full_name}</a>
                </Link>
            ),
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "phone",
            title: "تلفن",
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "state_name",
            title: "استان",
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "city_name",
            title: "شهر",
            isSortable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "status_name",
            title: "وضعیت",
            isSortable: true,
            isFilterable: true,
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        },
        {
            prop: "button",
            title:"عملیات",
            cell: (row) => (
                <>
                    <Link href={`/admins/mentors/jkh-${row.id}`} legacyBehavior>
                        <Button 
                            className="btn-sm"
                            variant="outline-indigo"
                        >
                            جزییات
                        </Button>
                    </Link>
                    <Button
                        className="btn-sm ms-2 me-2 delOpt"
                        variant="outline-warning"
                        onClick={(e)=>{
                            props.blckMent(row.id)
                        }}
                    >
                        {row.status == 3 ? "فعال سازی" : "مسدود سازی"}
                    </Button>
                    <Button
                        className="btn-sm delOpt"
                        variant="outline-danger"
                        onClick={(e)=>{
                            props.deleteMent(row.id)
                        }}
                    >
                        حذف
                    </Button>
                </>
            ),
            alignment:{horizontal:'center'},
            cellProps:{className:'align-middle text-center'}
        }
    ]
}