import React, { useRef } from "react";
import {
  Button,
  FormHelperText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

import { GroupControl } from "../../../packages/controls/groupControl";
import { Group } from "../../../packages/items/group";
import { Field } from "../../../packages/items/field";
import { ListControl } from "../../../packages/controls/listControl";
import { List } from "../../../packages/items/list";
import { requiredValidator } from "../../../packages/validators";
import { Error } from "../../../packages/items/error";

const createFamilyMemberGroup = () => {
  return new GroupControl({
    name: [""],
    tel: [""],
  });
};

const NestedDemo = () => {
  const fromGroupRef = useRef(
    new GroupControl({
      name: ["", { validators: [requiredValidator] }],
      familyMembers: new ListControl([createFamilyMemberGroup()], {
        validators: [requiredValidator],
      }),
    })
  );

  return (
    <>
      <Group control={fromGroupRef.current}>
        {(v) => (
          <>
            <Typography variant="h6">本人：</Typography>
            <Field name="name">
              {({ value, setValue }) => {
                return <TextField label="本人姓名" value={value} onChange={(e) => setValue(e.target.value)} />;
              }}
            </Field>
            <br />
            <br />

            <Typography variant="h6">家庭成员：</Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell>联系电话</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <List name="familyMembers">
                    {({ childControls }) => {
                      return (
                        <>
                          {childControls.map((control, i) => {
                            return (
                              <Group name={`${i}`} key={`${i}`}>
                                {() => {
                                  return (
                                    <TableRow>
                                      <TableCell>
                                        <Field name="name">
                                          {({ value, setValue }) => {
                                            return (
                                              <TextField
                                                label="姓名"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                              />
                                            );
                                          }}
                                        </Field>
                                      </TableCell>
                                      <TableCell>
                                        <Field name="tel">
                                          {({ value, setValue }) => {
                                            return (
                                              <TextField
                                                label="联系电话"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                              />
                                            );
                                          }}
                                        </Field>
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            fromGroupRef.current.get<ListControl>("familyMembers").remove(i);
                                          }}
                                        >
                                          删除
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }}
                              </Group>
                            );
                          })}
                        </>
                      );
                    }}
                  </List>
                </TableBody>
              </Table>
            </TableContainer>
            <Error name="familyMembers">
              {({ errors, dirty }) => (
                <>{errors?.required && <FormHelperText error>至少填一名家庭成员</FormHelperText>}</>
              )}
            </Error>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                fromGroupRef.current.get<ListControl>("familyMembers").push(createFamilyMemberGroup());
              }}
            >
              加一名成员
            </Button>
          </>
        )}
      </Group>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(fromGroupRef.current.value);
        }}
      >
        在控制台中打印数据
      </Button>
    </>
  );
};

export default NestedDemo;
