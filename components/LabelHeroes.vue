<template>
  <div class="label-heroes">
    <ul>
      <li v-for="label in labels" :key="label.id">
        <div class="icon"/>
        <span>{{label.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: [
        { name: 'New Idea', id: 'new_idea' },
        { name: 'Worth Copying', id: 'worth_copying' },
        { name: 'Requires Attention', id: 'requires_attention' },
        { name: 'Key Success', id: 'key_success' },
        { name: 'Lately Changed', id: 'lately_changed' },
        { name: 'Constantly Changing', id: 'constantly_changing' },
        { name: 'Key Finding', id: 'key_finding' },
        { name: 'Not Evaluated', id: 'not_evaluated' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.label-heroes {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        width: 0.7rem;
        height: 0.7rem;
        min-width: 0.7rem;
        min-height: 0.7rem;
        background-color: epot-color('white');
        margin-right: 1ex;
        border-radius: 50%;
      }

      &:not(:first-child) {
        .icon {
          margin-left: 4ex;
        }
      }

      span {
        color: epot-color('white');
      }
    }
  }
}
</style>
