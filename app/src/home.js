import React from "react"
import { Flex, Box, Text, Button } from "rebass"
import { Input, Checkbox, Label } from "@rebass/forms"
import { useDispatch, useSelector } from "react-redux"
import { dump, fund } from "./redux"
import { SUBSTRATE_ADDRESS_PATTERN, T0RN_TERMS } from "./constants"

export default function HomeScreen() {
  const { substrateAddress, termsAccepted, termsVisible } = useSelector(
    state => state
  )
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
      <Label sx={{ display: "inline-grid", pointerEvents: "none" }}>
        <Checkbox
          id="terms"
          sx={{
            color: "#000",
            marginTop: ".25em",
            pointerEvents: "auto",
            cursor: "pointer"
          }}
          checked={termsAccepted || false}
          onChange={e => dispatch(dump({ termsAccepted: e.target.checked }))}
        />
        <Text sx={{ fontWeight: "normal", display: "inline-block" }}>
          I hereby accept the{" "}
          <a
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              pointerEvents: "auto"
            }}
            onClick={e => {
              e.preventDefault()
              dispatch(dump({ termsVisible: !termsVisible }))
            }}
          >
            t0rn terms of use
          </a>
          .
        </Text>
      </Label>
      <Text
        sx={{
          display: termsVisible ? "block" : "none",
          fontFamily: "monospace",
          fontSize: ".625em",
          textAlign: "justify"
        }}
      >
        {T0RN_TERMS}
      </Text>
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
        onClick={() => dispatch(fund(substrateAddress))}
      >
        GET {process.env.REACT_APP_AMOUNT}T0RN
      </Button>
    </Box>
  )
}
