import { IElectionRole } from "../pages/modal";

interface ISelectRoleProps {
  roles: IElectionRole[] | null;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}
const SelectRole = ({ roles, setSearchParam }: ISelectRoleProps) => {
  return (
    <>
      <select
        onChange={(e) => {
          if (e.target.value !== "Select a role") {
            setSearchParam(e.target.value);
          }
        }}
        className="form-select"
        placeholder="Select a role"
      >
        <option selected>Select a role</option>
        {roles &&
          roles?.map((element) => (
            <option key={element.id} value={element.role}>
              {element.role}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectRole;
