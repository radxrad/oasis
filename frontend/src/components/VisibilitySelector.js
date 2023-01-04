import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { VscLock } from "react-icons/vsc";
import { BiGlobe } from "react-icons/bi";

const VisibilitySelector = (props) => {
  const visibility = props.visibility;
  const getDropdownItem = (visibility) => {
    if (visibility === null)
      return (
        <div>
          <BiGlobe />
          Myself
        </div>
      );
    else if (visibility === "true")
      return (
        <div>
          <BiGlobe />
          Public
        </div>
      );
    else
      return (
        <div>
          <VscLock />
          Anonymous
        </div>
      );
  };
  return (
    <DropdownButton
      className={"visibility visibility--" + visibility}
      title={getDropdownItem(visibility)}
      variant="light"
      onSelect={props.handleSelect}
    >
      <Dropdown.Item eventKey="true" className="item__public">
        <div>
          <BiGlobe />
          Public
        </div>
      </Dropdown.Item>
      <Dropdown.Item eventKey="false" className="item__anonymous">
        <div>
          <VscLock />
          Anonymous
        </div>
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default VisibilitySelector;
