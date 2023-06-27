<template>
    <header class="site-header container">
        <small class="site-header__prefix">URBN Hackathon</small>
        <h1 class="site-header__heading">SEO Tooling</h1>
    </header>
</template>

<style lang="scss">
.site-header {
  text-align: center;

    &__prefix {
        letter-spacing: 0.5em;
        text-transform: uppercase;
    }

    &__heading {
        font-family: var(--font-heading);
        font-size: var(--font-size-title);
        line-height: 1em;
        margin-top: 0.25em;
        font-size: 3em;
        background: linear-gradient(#666, #666, #000);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        // force text descenders to show
        padding: 0.25em;
    }
}
</style>
