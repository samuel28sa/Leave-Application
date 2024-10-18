import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import image3 from "../../../../assets/Image3.png";
import httpClient from "../../../../api/axios";
import { useUserProfile } from "../../../../stores/userProfile";
import { format } from "date-fns";

export const Celebrants = () => {
  const profile = useUserProfile((state) => state.profile);
  const [celebrants, setCelebrants] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const fetchBirthdayCelebrants = async () => {
    setIsBusy(true);
    try {
      const { data } = await httpClient.get("/user/upcoming-celebrants");
      setCelebrants(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    fetchBirthdayCelebrants();
  }, []);
  return (
    <Panel
      className="h-80"
      Background={() => <div className="flex justify-center h-fit"></div>}
    >
      <h3 className="text-black font-bold">Celebrations this month🎉</h3>

      <div className="border-b-2 border-b-grey-400"></div>
      <div className="flex h-72 justify-center py-2 overflow-hidden overflow-y-auto">
        {celebrants.length == 0 && (
          <div className="flex flex-col">
            <img className="h-4/6" src={image3} />,
            <span className="text-xs font-bold text-gray-500 text-justify">
              We did it. Everyone know how special they are!!
            </span>
            ,
          </div>
        )}

        {celebrants.length > 0 && (
          <div className="flex flex-col space-y-2 w-full">
            {celebrants.map((celebrant) => (
              <div className="flex justify-between border rounded border-1 text-xs p-2 text-gray-600">
                <span>{celebrant.username}</span> celebrates on
                <span>
                  {format(celebrant.dob, "do")} of{" "}
                  {format(celebrant.dob, "LLLL")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Celebrants;
