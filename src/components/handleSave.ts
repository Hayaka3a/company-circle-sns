import { supabase } from "../createClient";

export default async function HandleSave(eventName, startDate, endDate, eventDetail, imageUrl, fetchEventID) {
    await supabase
      .from("events")
      .update([
        {
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
          detail: eventDetail,
          thumbnail: imageUrl,
        },
      ])
      .eq("id", fetchEventID);
      console.log("Data updated successfuly.");
};