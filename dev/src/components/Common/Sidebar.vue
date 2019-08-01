<template lang="pug">
  v-navigation-drawer(
    v-model="drawer"
    width="300"
    :hide-overlay="hide_overlay"
    fixed
    app
    mobile-break-point="600"
    stateless
    manual-scroll
  )
    v-toolbar.primary(dark)
    v-tabs(
      v-model="active"
      slider-color="primary"
      grow
    )
      v-tab Ресурсы
      v-tab-item
        v-toolbar(flat height="50")
          v-tooltip(top v-if="managerAccess")
            v-btn(
              slot="activator"
              flat
              icon
              color="primary"
              to="/resource-create"
            )
              v-icon add_circle_outline
            span Создать ресурс
        v-expansion-panel(v-model="panel" expand)
          v-expansion-panel-content
            template(v-slot:header)
              div Manager_1
            v-list
              v-list-tile(to="/resources/1")
                v-list-tile-action
                  v-icon(color="primary") library_books
                v-list-tile-content
                  v-list-tile-title Новости

              v-list-tile(to="/resources/2")
                v-list-tile-action
                  v-icon(color="primary") library_books
                v-list-tile-content
                  v-list-tile-title Товары

              v-list-tile(to="/resources/3")
                v-list-tile-action
                  v-icon(color="primary") library_books
                v-list-tile-content
                  v-list-tile-title О нас

      v-tab(v-if="adminAccess") Элементы
      v-tab-item(v-if="adminAccess")
        v-list
          v-list-tile(to="/layouts")
            v-list-tile-action
              v-icon(color="primary") layers
            v-list-tile-content
              v-list-tile-title Шаблоны
          v-list-tile(to="/fields")
            v-list-tile-action
              v-icon(color="primary") playlist_add
            v-list-tile-content
              v-list-tile-title Дополнительные поля

      v-tab Файлы
      v-tab-item
        v-list
          v-list-tile(to="/filesystem")
            v-list-tile-action
              v-icon(color="primary") folder
            v-list-tile-content
              v-list-tile-title Файловая система
</template>

<script>
import panelMixin from "@/mixins/panelMixin";
import accessMixin from "@/mixins/accessMixin";
export default {
  name: "Sidebar",

  mixins: [panelMixin, accessMixin],

  data() {
    return {
      active: null,
      drawer: true,
      mini: true,
      right: null,
      hide_overlay: true,
      panelName: "panel-resource"
    };
  }
};
</script>
