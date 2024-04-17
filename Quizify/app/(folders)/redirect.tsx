import { Redirect } from "expo-router";

export default function TestDisplay() {
  return (
    <Redirect href={'/(quiz)/testDisplay'}/>
  );
}