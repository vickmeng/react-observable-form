import React from "react";

import { GroupControl } from "../controls/groupControl";
import { ListControl } from "../controls/listControl";

export const ParentFormContext = React.createContext<GroupControl | ListControl<any> | null>(null);
