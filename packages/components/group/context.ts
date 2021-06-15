import React from "react";

import { GroupControl } from "../../controls/groupControl";
// TODO Array
export const formGroupContext = React.createContext<GroupControl | null>(null);
