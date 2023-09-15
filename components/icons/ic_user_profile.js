export default function Icon_UProfile(props){
    return(
        <img
            className="avatar rounded-circle ms-1"
            alt="Image placeholder"
            src={`/storage/avatars${props.avatar}`}
            {...props}
        />
    )
}