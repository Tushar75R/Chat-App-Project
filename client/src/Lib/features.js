import moment from "moment";

export const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();
    
    if(fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg"){
        return "video";
    }else if(fileExt === "mp3" || fileExt === "wav"){
        return "audio";
    }else if(fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif"){
        return "image"
    }else return "file"
} 

export const last7day = () => {
    const currentDate = moment();
    const last7days = [];
    for(let i = 0; i <7 ; i++) {
        const dayDate = currentDate.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd");
        last7days.unshift(dayName);
    } 
    return last7days;
}

export const transformImage = (url="", width = 100) => url;