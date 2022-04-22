import React from "react"
import { Flex, Box, Text, Button } from "rebass"
import { Input, Checkbox, Label } from "@rebass/forms"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { dump } from "./redux"

const SUBSTRATE_ADDRESS = /^5[a-zA-Z0-9]{47}$/

const TERMS = `Terms of Use – t0rn network

The t0rn network – a test net for the t3rn Circuit - and the T0RN coins are provided as a basis and playground for developers and for educational and amusement purposes only.

The t0rn faucet is provided to supply you with T0RN coins that are needed to use the t0rn network. T0RN does not represent any monetary value. We reserve the right to directly deduct or add amounts from or to your disposal.

Please do not insert real data or personal data as data will be lost. We will not save your data, track losses or make backups of any data inserted by you in the t0rn network. Due to the aim of the t0rn network not only data but also features and functionalities will regularly be amended, changed or deleted without prior notification.

Therefore, we are not liable for any disruption or even permanent uselessness of your features or applications built on top of our systems.

For the usage of the t0rn network and the T0RN coins, these Terms of Use are applicable. If you disagree with any of these terms, please refrain from using the t0rn network and/or T0RN coins.`

export default function HomeScreen() {
  const { substrateAddress, termsAccepted } = useSelector(state => state)
  const dispatch = useDispatch()

  async function onClick() {
    if (!SUBSTRATE_ADDRESS.test(substrateAddress)) return
    dispatch(dump({ dots: true }))
    let res
    try {
      res = await fetch(`${process.env.REACT_APP_API_URL}/${substrateAddress}`)
    } catch (err) {
      console.error(err)
      res = { status: 419 }
    }
    if (res.status !== 202) {
      dispatch(
        dump({
          modalTitle: "❌ error",
          modalText: `note that requests are rate limited to 1 per ${
            parseInt(process.env.REACT_APP_BLACKLIST_SECONDS) / 3600
          }h and ip`
        })
      )
    } else {
      dispatch(
        dump({
          modalTitle: "💎 success",
          modalText: `just minted ${process.env.REACT_APP_AMOUNT}T0RN to ${substrateAddress}`
        })
      )
    }
    dispatch(dump({ dots: false }))
  }

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
        <NavLink
          to="/"
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
        </NavLink>
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
      <Label title={TERMS}>
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
        disabled={!SUBSTRATE_ADDRESS.test(substrateAddress) || !termsAccepted}
        aria-label="request test coins"
        type="submit"
        sx={{
          width: "100%",
          marginTop: "0.625em",
          marginBottom: "1.25em",
          bg: "#000",
          cursor:
            SUBSTRATE_ADDRESS.test(substrateAddress) && termsAccepted
              ? "pointer"
              : "none",
          fontWeight: "bold"
        }}
        onClick={onClick}
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
