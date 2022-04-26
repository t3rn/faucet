import React from "react"
import { Flex, Box, Text, Button } from "rebass"
import { Input, Checkbox, Label } from "@rebass/forms"
import { useDispatch, useSelector } from "react-redux"
import { dump, fund } from "./redux"
import { SUBSTRATE_ADDRESS_PATTERN, T0RN_TERMS } from "./constants"

export default function HomeScreen() {
  const { substrateAddress, termsAccepted } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        margin: "10vh auto auto auto",
        background: "#fff",
        padding: "0 0.625em",
        maxWidth: "24em"
      }}
    >
      <Flex
        sx={{
          fontWeight: "bold",
          justifyContent: "center",
          marginBottom: "0.625em",
          flexWrap: "wrap"
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            fontSize: 36,
            fontWeight: "bolder",
            color: "#000",
            verticalAlign: "top",
            alignSelf: "flex-end"
          }}
        >
          {process.env.REACT_APP_PROJECT_NAME}
        </a>
      </Flex>
      <Input
        type="text"
        id="address"
        placeholder="Enter Substrate address"
        title="SS58 address starting with '5'"
        onChange={e => dispatch(dump({ substrateAddress: e.target.value }))}
        value={substrateAddress || ""}
        bg="#fff"
        sx={{ marginBottom: "0.625em" }}
      />
      <Label title={T0RN_TERMS}>
        <Checkbox
          id="terms"
          sx={{ color: "#000", marginTop: ".25em" }}
          onClick={e => dispatch(dump({ termsAccepted: e.target.checked }))}
        />
        <Text sx={{ fontWeight: "normal", display: "inline-block" }}>
          I hereby accept the t0rn terms of use.
        </Text>
      </Label>
      <Button
        disabled={
          !SUBSTRATE_ADDRESS_PATTERN.test(substrateAddress) || !termsAccepted
        }
        aria-label="request test coins"
        type="submit"
        sx={{
          width: "100%",
          marginTop: "0.625em",
          marginBottom: "1.25em",
          bg: "#000",
          cursor:
            SUBSTRATE_ADDRESS_PATTERN.test(substrateAddress) && termsAccepted
              ? "pointer"
              : "none",
          fontWeight: "bold"
        }}
        onClick={() => fund(substrateAddress)}
      >
        GET {process.env.REACT_APP_AMOUNT}T0RN
      </Button>
      <Text
        sx={{
          marginBottom: "0.625em",
          textAlign: "center",
          fontFamily: "Open Sans",
          fontWeight: "normal"
        }}
      >
        T0RN coins do not and will never have an actual economic value.
      </Text>
    </Box>
  )
}
