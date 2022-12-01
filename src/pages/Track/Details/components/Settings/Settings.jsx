import React from "react";
import Switch from "../../../../../components/Switch/Switch";
import "./Settings.scss";
import { ReactComponent as Calendar } from "./calendar.svg";
import { useRef } from "react";
import Button from "../../../../../components/Button/Button";
import axios from "axios";
import { ENVS } from "../../../../../constants";
import { useParams } from "react-router";

const Settings = ({ data, setData, getAllInfo }) => {
  console.log(data);
  const calendarRef = useRef();
  const id = useParams().id;

  const onSave = async () => {
    console.log(data.settings);
    const res = await axios.put(`${ENVS.BACKEND_URL}/settings/${id}`, data);
    const resData = res.data.data;
    console.log(resData);
    await getAllInfo();
    alert("Saved successfully");
  };

  const renderSwitch = (dynamicField) => {
    return (
      <Switch
        className={"switchi"}
        id={dynamicField}
        value={data?.settings?.[dynamicField].active}
        setValue={(val) =>
          setData((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              [dynamicField]: {
                ...prev?.settings?.[dynamicField],
                active: val,
              },
            },
          }))
        }
      />
    );
  };

  return (
    <div className="settings">
      <div className="heading">Settings</div>

      <div className="options">
        <div className="option">
          <div className="subheading">Target Url</div>
          <div className="label">Customize your target URL</div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.target_url ? "disabled" : ""
            }`}
          >
            <input
              type="text"
              value={data?.target_url}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  target_url: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="option">
          <div className="subheading">
            Accessible Ips
            {renderSwitch("accessible_ips")}
          </div>
          <div className="label">
            Enter comma{" ( , ) "} seperated ips you want to allow.
          </div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.settings.accessible_ips.active ? "disabled" : ""
            }`}
          >
            <input
              type="text"
              disabled={!data.settings.accessible_ips.active}
              value={data?.settings?.accessible_ips.value.join(",")}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    accessible_ips: {
                      ...prev.settings.accessible_ips,
                      value: e.target.value.split(","),
                    },
                  },
                }));
              }}
            />
          </div>
        </div>
        <div className="option">
          <div className="subheading">
            Accessible countries
            {renderSwitch("accessible_countries")}
          </div>
          <div className="label">
            Enter comma{" ( , ) "} seperated country codes you want to allow.
          </div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.settings.accessible_countries.active ? "disabled" : ""
            }`}
          >
            <input
              type="text"
              disabled={!data.settings.accessible_countries.active}
              value={data?.settings?.accessible_countries.value.join(",")}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    accessible_countries: {
                      ...prev.settings.accessible_countries,
                      value: e.target.value.split(","),
                    },
                  },
                }));
              }}
            />
          </div>
        </div>
        <div className="option">
          <div className="subheading">
            Expiry time
            {renderSwitch("expiry_time")}
          </div>
          <div className="label">Choose date when you want link to expire</div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.settings.expiry_time.active ? "disabled" : ""
            }`}
          >
            <input
              className="inputDateTime"
              type="datetime-local"
              ref={calendarRef}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    expiry_time: {
                      ...prev.settings.expiry_time,
                      value: e.target.value + "Z",
                    },
                  },
                }))
              }
              value={data.settings.expiry_time.value.substring(
                0,
                data.settings.expiry_time.value.length - 1
              )}
            />
          </div>
        </div>
        <div className="option">
          <div className="subheading">
            Visits remaining
            {renderSwitch("visits_remaining")}
          </div>
          <div className="label">
            It shows the number of visits remaining for your link.
          </div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.settings.visits_remaining.active ? "disabled" : ""
            }`}
          >
            <input
              type="number"
              disabled={!data.settings.visits_remaining.active}
              value={
                data?.settings?.visits_remaining.value < 0
                  ? 0
                  : data?.settings?.visits_remaining.value
              }
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    visits_remaining: {
                      ...prev.settings.visits_remaining,
                      value: parseInt(e.target.value < 0 ? 0 : e.target.value),
                    },
                  },
                }));
              }}
            />
          </div>
        </div>
        <div className="option">
          <div className="subheading">
            Scheduled usage
            {renderSwitch("scheduled_usage")}
          </div>
          <div className="label">
            Select the duration when you want the link to be available.
          </div>
          <div
            class={`webflow-style-input removeRGB ${
              !data.settings.scheduled_usage.active ? "disabled" : ""
            }`}
          >
            <input
              type="time"
              disabled={!data.settings.scheduled_usage.active}
              value={data?.settings?.scheduled_usage.start_time}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    scheduled_usage: {
                      ...prev.settings.scheduled_usage,
                      start_time: e.target.value,
                    },
                  },
                }));
              }}
            />
            &nbsp;&nbsp;
            <input
              type="time"
              disabled={!data.settings.scheduled_usage.active}
              value={data?.settings?.scheduled_usage.end_time}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    scheduled_usage: {
                      ...prev.settings.scheduled_usage,
                      end_time: e.target.value,
                    },
                  },
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="save">
        <button onClick={() => onSave()}>Save</button>
      </div>
    </div>
  );
};

export default Settings;
