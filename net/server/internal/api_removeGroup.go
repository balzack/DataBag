package databag

import (
  "errors"
  "net/http"
  "gorm.io/gorm"
  "github.com/gorilla/mux"
  "databag/internal/store"
)

func RemoveGroup(w http.ResponseWriter, r *http.Request) {

  account, code, err := BearerAppToken(r, false)
  if err != nil {
    ErrResponse(w, code, err)
    return
  }
  params := mux.Vars(r)
  groupId := params["groupId"]

  var slot store.GroupSlot
  if err := store.DB.Preload("Group.GroupData").Preload("Group.Cards").Where("account_id = ? AND group_slot_id = ?", account.ID, groupId).First(&slot).Error; err != nil {
    if errors.Is(err, gorm.ErrRecordNotFound) {
      ErrResponse(w, http.StatusNotFound, err)
    } else {
      ErrResponse(w, http.StatusInternalServerError, err)
    }
    return
  }
  cards := slot.Group.Cards
  notify := []*store.Card{}

  err = store.DB.Transaction(func(tx *gorm.DB) error {
    if res := tx.Model(slot.Group).Association("Cards").Clear(); res != nil {
      return res
    }
    if res := tx.Delete(&slot.Group.GroupData).Error; res != nil {
      return res
    }
    if res := tx.Delete(&slot.Group).Error; res != nil {
      return res
    }
    for _, card := range cards {
      if res := tx.Model(&card).Update("ViewRevision", card.ViewRevision + 1).Error; res != nil {
        return res
      }
      notify = append(notify, &card)
    }
    slot.GroupID = 0
    slot.Group = nil
    slot.Revision = account.GroupRevision + 1
    if res := tx.Save(&slot).Error; res != nil {
      return res
    }
    return nil
  })
  if err != nil {
    ErrResponse(w, http.StatusInternalServerError, err)
    return
  }

  for _, card := range notify {
    SetContactViewNotification(account, card)
  }
  SetStatus(account)
  WriteResponse(w, nil)
}

