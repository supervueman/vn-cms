<template>
  <v-list>
    <v-list-item
      v-if="r.is_layout_read"
      to="/layouts"
    >
      <v-list-item-action>
        <v-icon color="primary">
          layers
        </v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ d.layouts || 'Layouts' }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon 
          to="/layout-create"
        >
          <v-icon color="primary">
            add_circle_outline
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-list-item
      v-if="r.is_field_read"
      to="/fields"
    >
      <v-list-item-action>
        <v-icon color="primary">
          playlist_add
        </v-icon>
      </v-list-item-action>
        
      <v-list-item-content>
        <v-list-item-title>{{ d.fields || 'Fields' }}</v-list-item-title>
      </v-list-item-content>
        
      <v-list-item-action>
        <v-btn
          icon
          to="/field-create"
        >
          <v-icon color="primary">
            add_circle_outline
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-list-item
      v-if="r.is_field_category_read"
      to="/fieldcategories"
    >
      <v-list-item-action>
        <v-icon color="primary">
          folder
        </v-icon>
      </v-list-item-action>
        
      <v-list-item-content>
        <v-list-item-title>{{ d.field_categories || 'Fields categories' }}</v-list-item-title>
      </v-list-item-content>
        
      <v-list-item-action>
        <v-btn
          icon
          to="/fieldcategory-create"
        >
          <v-icon color="primary">
            add_circle_outline
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-list-item
      v-if="r.is_tag_read"
      to="/tags"
    >
      <v-list-item-action>
        <v-icon color="primary">
          assignment
        </v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ d.tags || 'Tags' }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn
          icon
          to="/tag-create"
        >
          <v-icon color="primary">
            add_circle_outline
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "DevelopmentTab"
};
</script>
