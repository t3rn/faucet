import { default as ReactModal } from "react-modal"
import { useSelector, useDispatch } from "react-redux"
import { Text, Button, Flex, Box } from "rebass"
import { dump } from "./redux"

export default function Modal() {
  const dispatch = useDispatch()
  const { modalText, modalTitle, onok } = useSelector(state => state)
  const hasOkHandler = onok && typeof window[onok] === "function"
  return (
    <ReactModal
      isOpen={!!modalText}
      onRequestClose={() => {
        if (hasOkHandler) window[onok] = null
        dispatch(dump({ modalText: null, onok: null }))
      }}
      contentLabel="info overlay modal"
      appElement={document.getElementById("root")}
    >
      <Flex
        style={{
          justifyContent: "center",
          marginTop: window.innerHeight < 300 ? "0" : "20vh"
        }}
      >
        <Box
          sx={{
            background: "#fff",
            border: "0.1875em solid #000",
            boxShadow: "0 0.625em",
            padding: "0.625em",
            overflow: "hidden",
            textAlign: "center",
            fontSize: ["1em", "1.25em"]
          }}
        >
          <Text sx={{ fontWeight: "bold", marginBottom: "0.625em" }}>
            {modalTitle}
          </Text>
          <Text>{modalText}</Text>
          {hasOkHandler && (
            <Button
              style={{
                color: "#000",
                cursor: "pointer",
                margin: "1.25em 0.625em 0 0.625em",
                float: "left"
              }}
              onClick={() => {
                if (hasOkHandler) window[onok] = null
                dispatch(dump({ modalText: null, onok: null }))
              }}
            >
              cancel
            </Button>
          )}
          <Button
            style={{
              color: "#000",
              cursor: "pointer",
              margin: "1.25em 0.625em 0 0.625em",
              float: hasOkHandler ? "right" : "none"
            }}
            onClick={() => {
              if (hasOkHandler) {
                window[onok]()
                window[onok] = null
              }
              dispatch(dump({ modalText: null, onok: null }))
            }}
          >
            ok
          </Button>
          <div style={{ clear: "both" }}></div>
        </Box>
      </Flex>
    </ReactModal>
  )
}
