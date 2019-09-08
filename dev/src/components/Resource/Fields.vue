<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.mb-4
      v-flex.md12(v-for="(field, i) in fields" :key="i")
        v-layout.mb-4
          //- Text field
          v-flex(v-if="field.interface.fieldType === 'text'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-text-field(
              v-model="field.value"
            )

          //- Textarea field
          v-flex(v-else-if="field.interface.fieldType === 'textarea'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-textarea(
              v-model="field.value"
            )

          //- Editor field
          v-flex(v-else-if="field.interface.fieldType === 'editor'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            editor(
              v-if="field.value"
              :content="field.value"
              @update="field.value = $event()"
            )

          //- Image field
          v-flex(v-else-if="field.interface.fieldType === 'image'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            image-field(
              :path.sync="field.value"
              @selectFile="field.value = $event"
            )

          //- Select field
          v-flex(v-else-if="field.interface.fieldType === 'select'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-select(
              :items="field.interface.defaultValue"
              v-model="field.value"
            )

          //- Migx field
          v-flex(v-else-if="field.interface.fieldType === 'migx'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            migx-field(
              :field="field.value"
              :schema="field.interface.schema"
              @create="field.value.push($event)"
              @update="field.value[$event.index] = $event.item"
              @remove="field.value.splice($event, 1)"
            )

          //- Date field
          v-flex(v-else-if="field.interface.fieldType === 'date'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-date-picker(
                v-model="field.value"
                no-title
                scrollable
                color="primary"
              )

          //- Time field
          v-flex(v-else-if="field.interface.fieldType === 'time'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-time-picker(
                format="24hr"
                v-model="field.value"
              )

          //- Checkbox field
          v-flex(v-else-if="field.interface.fieldType === 'checkbox'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-checkbox(
              color="primary"
              v-model="field.value"
            )
    v-card-actions
      v-btn(color="primary" @click="saveAdditionalFields") Сохранить
</template>

<script>
// Components
import MigxField from "@/components/Common/Migx/MigxField";

export default {
  name: "ResourceFields",

  components: {
    MigxField
  },

  computed: {
    additionalFields() {
      return this.$store.getters["resource/getAdditionalFields"];
    },
    fields() {
      return this.$store.getters["resource/getSerializedFields"];
    }
  },

  methods: {
    async saveAdditionalFields() {
      for (let el in this.fields) {
        if (this.fields[el].id) {
          const updateField = {
            id: this.fields[el].id,
            slug: el,
            value: this.fields[el].value,
            resourceId: this.fields[el].resourceId,
            fieldId: this.fields[el].interface.id
          };
          if (this.fields[el].interface.fieldType === "migx") {
            updateField.value = JSON.stringify(this.fields[el].value);
          }
          await this.$store.dispatch("additionalField/update", updateField);
        } else {
          const createField = {
            slug: el,
            value: this.fields[el].value,
            resourceId: this.fields[el].resourceId,
            fieldId: this.fields[el].interface.id
          };
          if (this.fields[el].interface.fieldType === "migx") {
            createField.value = JSON.stringify(this.fields[el].value);
          }
          await this.$store.dispatch("additionalField/create", createField);
        }
      }
    }
  }
};
</script>
