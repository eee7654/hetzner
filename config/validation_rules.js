import { ruleNotIn,ruleIn,register } from 'simple-body-validator'
import { lastYearToJalali } from './date_utils'

const sessionBase = {
    uID : ['nullable', 'integer'],
    uNAM : ['nullable', 'string'],
    status : ['required','integer',ruleNotIn([3,4,5])]
}

const adCreateBase = {
    title : ['required', 'string','min:10','max:45'],
}

export const SessionRules = (params)=>{
    if(params.isAuth){
        sessionBase.auth = ['required','accepted']
    }
    if(params.hasOwnProperty('roles')){
        sessionBase.type = ['required','integer',ruleIn(params.roles)]
    }
    return sessionBase
}

export const AdCreateRules = (params)=>{

}

export const ApartmentRules = (params)=>{
    return {
        constructed_at:['allowed_apartment','required','integer','min:1300',`max:${lastYearToJalali}`],
        area:['required','integer','min:10','max:1000'],
        room:['sometimes','required','integer','min:0','max:10'],
        floors_count:['sometimes','required','integer','min:1','max:200'],
        floor_number:['required','integer','min:1','max:200'],
        units:['required','integer','min:1','max:100'],
        building_status:['sometimes','required','string','min:2','max:20'],
        ownership_doc:['sometimes','required','string','min:2','max:20']
    }
}

export const HouseRules = (params)=>{
    return {
        constructed_at:['allowed_house','required','integer','min:1300',`max:${lastYearToJalali}`],
        building_area:['required','integer','min:10','max:1000'],
        land_area:['required','integer','min:10','max:1000'],
        room:['sometimes','integer','min:0','max:10'],
        floors_count:['sometimes','integer','min:1','max:200'],
        building_status:['sometimes','string','min:2','max:20'],
        ownership_doc:['sometimes','string','min:2','max:20']
    }
}

export const OldHouseRules = (params)=>{
    return {
        constructed_at:['allowed_oldhouse','sometimes','integer','min:1300',`max:${lastYearToJalali}`],
        area:['required','integer','min:10','max:10000'],
        ownership_doc:['sometimes','string','min:2','max:20']
    }
}

export const StoreRules = (params)=>{
    return {
        constructed_at:['allowed_store','required','integer','min:1300',`max:${lastYearToJalali}`],
        area:['required','integer','min:10','max:300'],
        room:['sometimes','integer','min:0','max:10'],
        ownership_doc:['sometimes','string','min:2','max:20']
    }
}

export const SiloRules = (params)=>{
    return {
        constructed_at:['allowed_silo','required','integer','min:1300',`max:${lastYearToJalali}`],
        silo_area:['sometimes','integer','min:10','max:10000'],
        land_area:['required','integer','min:10','max:10000'],
        room:['sometimes','integer','min:0','max:10'],
        ownership_doc:['sometimes','string','min:2','max:20'],
        electricity_details:['sometimes','string','min:5','max:20']
    }
}

export const AgriculturalsRules = (params)=>{
    return {
        area:['allowed_agricultural','required','integer','min:10'],
        ownership_doc:['sometimes','string','min:2','max:20']
    }
}

export const AdFeatureRules = (params)=>{
    return {
        feature_id:['allowed_level4','required','integer','min:1','max:20'],
        feature_value:['required','string','min:1','max:20']
    }
}

export const UserRegRules = (params)=>{
    return {
        full_name:['allowedKeys','required','string','min:5','max:50'],
        national_id:['required','string','min:10','max:10'],
        email:['sometimes','string','email','min:12','max:100']
    }
}

export const CreateAdvisorRules = {
    full_name:['allowed_advCreate','required','string','min:10','max:45'],
    phone:['required','string','phone'],
    national_id:['required','string','size:10'],
    agency_id:['sometimes','required','numeric'],
    stateid:['required_without:agency_id','numeric'],
    cityid:['required_without:agency_id','numeric'],
    coordinates:['required_without:agency_id','string','min:8','max:50'],
    address:['required_without:agency_id','string','min:10','max:150']
}

export const CreateAgencyRules = {
    name:['allowed_agcCreate','required','string','min:10','max:45'],
    mobile:['required','string','phone'],
    telephone:['required','string','telefone'],
    stateid:['required','numeric'],
    cityid:['required','numeric'],
    coordinates:['required','string','min:8','max:50'],
    address:['required','string','min:10','max:150'],
    manager:['required','string','min:8','max:45'],
    association_code:['sometimes','required','numeric','size:16']
}

export const CreateMentorRules = {
    full_name:['allowed_mntCreate','required','string','min:10','max:45'],
    phone:['required','string','phone'],
    stateid:['required','numeric'],
    cityid:['required','numeric'],
    coordinates:['required','string','min:8','max:50'],
    address:['required','string','min:10','max:150'],
    national_id:['required','string','size:10'],
}

export const setAllowedKeys = (rule,keys)=>{
    register(`allowed_${rule}`,
    function (value) {
        return Object.keys(this.data).every(key => keys.includes(key))
    },
    function(meesage){
        return 'ExtraData'
    })
}

export const setPhoneRule = ()=>{
    register('phone',
    function (value) {
        var re = /[0][9][0-9]{9}/
        return re.test(value)
    },
    function(meesage){
        return 'wrong phone format'
    })
}

export const setTelephoneRule = ()=>{
    register('telefone',
    function (value) {
        var re = /[0][0-9]{10}/
        return re.test(value)
    },
    function(meesage){
        return 'wrong telephone format'
    })
}