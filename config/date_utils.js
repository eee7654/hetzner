import moment from "jalali-moment"

export const getNow = moment().format('YYYY-MM-DD HH:mm')

export const toJalaliObj = (orgDate)=>{
    return moment(orgDate).locale('fa')
}

export const toJalaliStr = (orgDate)=>{
    return moment(orgDate).locale('fa').format('YYYY/MM/DD HH:mm')
}

export const toMiladiStr = (orgDate)=>{
    return moment(orgDate).format('YYYY/MM/DD HH:mm')
}

export const toJSObject = (date)=>{
    return moment(date).format('YYYY/MM/DD HH:mm')
}

export const addToNowObj = (amount,unit)=>{
    return moment().add(amount,unit)
}

export const addToNowStr = (amount,unit)=>{
    return moment().add(amount,unit).format('YYYY-MM-DD HH:mm')
}

export const isBeforeDate = (date)=>{
    return moment().isBefore(moment(date))
}