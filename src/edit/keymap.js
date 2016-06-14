const Keymap = require("browserkeymap")
const browser = require("../util/browser")

const c = require("./commands").commands

// :: Keymap A basic keymap containing bindings not specific to any schema.
const baseKeymap = new Keymap({
  "Enter": c.chainCommands(c.newlineInCode, c.createParagraphNear,
                           c.liftEmptyBlock, c.splitBlock),

  "Backspace": c.chainCommands(c.deleteSelection, c.joinBackward, c.deleteCharBefore),
  "Mod-Backspace": c.chainCommands(c.deleteSelection, c.joinBackward, c.deleteWordBefore),
  "Delete": c.chainCommands(c.deleteSelection, c.joinForward, c.deleteCharAfter),
  "Mod-Delete": c.chainCommands(c.deleteSelection, c.joinForward, c.deleteWordAfter),

  "Alt-Up": c.joinUp,
  "Alt-Down": c.joinDown,
  "Mod-[": c.lift,
  "Esc": c.selectParentNode,

  "Mod-Z": c.undo,
  "Mod-Y": c.redo,
  "Shift-Mod-Z": c.redo
})
exports.baseKeymap = baseKeymap

if (browser.mac) baseKeymap.addBindings({
  "Ctrl-H": baseKeymap.lookup("Backspace"),
  "Alt-Backspace": baseKeymap.lookup("Mod-Backspace"),
  "Ctrl-D": baseKeymap.lookup("Delete"),
  "Ctrl-Alt-Backspace": baseKeymap.lookup("Mod-Delete"),
  "Alt-Delete": baseKeymap.lookup("Mod-Delete"),
  "Alt-D": baseKeymap.lookup("Mod-Delete")
})
